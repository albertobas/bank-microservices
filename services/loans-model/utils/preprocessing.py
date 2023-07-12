import pandas as pd
import numpy as np
from sklearn.base import BaseEstimator, TransformerMixin


class Encoder(BaseEstimator, TransformerMixin):
    def __init__(self, categories, qualitative):
        self.categories = categories
        self.qualitative = qualitative

    def fit(self, X, y=None):
        return self

    def transform(self, X):
        X_categorical = X.copy()
        for feature in self.qualitative:
            feature_categories = [
                cat for cat in self.categories if (feature + '_') in cat]
            feature_categories = [value.replace(
                feature + '_', '') for value in feature_categories]
            X_categorical[feature] = pd.Categorical(
                X_categorical[feature], categories=feature_categories).codes
        return X_categorical.values.astype(np.float32)
