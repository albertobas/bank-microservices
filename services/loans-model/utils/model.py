import torch.nn as nn
import torch.nn.functional as F


class Model(nn.Module):
    def __init__(self, num_units, input_size, dropout=0):
        super(Model, self).__init__()
        self.dense0 = nn.Linear(input_size, num_units)
        self.dropout0 = nn.Dropout(dropout)
        self.dense1 = nn.Linear(num_units, num_units)
        self.dropout1 = nn.Dropout(dropout)
        self.dense2 = nn.Linear(num_units, num_units)
        self.dropout2 = nn.Dropout(dropout)
        self.output = nn.Linear(num_units, 1)

    def forward(self, X):
        X = F.relu(self.dense0(X))
        X = self.dropout0(X)
        X = F.relu(self.dense1(X))
        X = self.dropout1(X)
        X = F.relu(self.dense2(X))
        X = self.dropout2(X)
        X = self.output(X)
        X = X.squeeze(-1)
        return X
