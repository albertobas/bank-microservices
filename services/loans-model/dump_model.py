#!/usr/bin/env python
# coding: utf-8

import itertools
import random
import numpy as np
from joblib import dump
from sklearn.preprocessing import MinMaxScaler
from sklearn.pipeline import Pipeline
from sklearn.datasets import fetch_openml
from torch import manual_seed
from torch.optim import Adam
from torch.nn.modules.loss import BCEWithLogitsLoss
from skorch import NeuralNetBinaryClassifier
from utils import Encoder, Model

SEED = 29
random.seed(SEED)
manual_seed(SEED)
np.random.seed(SEED)

data = fetch_openml(name="Lending-Club-Loan-Data", version=1,
                    as_frame=True, data_home='data', parser='auto')
frame = data.frame.copy()
y = frame['not.fully.paid'].astype(np.float32)
frame.drop('not.fully.paid', axis=1, inplace=True)


qualitative = ['purpose']
categories = list(itertools.chain.from_iterable((var + '_' + str(value)
                                                 for value in np.unique(frame[var].dropna()))
                                                for var in qualitative))

classifier = NeuralNetBinaryClassifier(
    Model(num_units=64, input_size=frame.shape[1]),
    criterion=BCEWithLogitsLoss,
    optimizer=Adam,
    batch_size=32,
    iterator_train__shuffle=True,
    lr=0.01,
    max_epochs=200)

pipe = Pipeline([
    ('encoder', Encoder(categories, qualitative)),
    ('scale', MinMaxScaler()),
    ('classifier', classifier),
])

pipe.fit(frame, y)

dump(pipe.best_estimator_, 'pipeline.joblib')
