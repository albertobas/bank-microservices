FROM python:3.11.3-slim AS base
ENV PIP_DISABLE_PIP_VERSION_CHECK=1
WORKDIR /app

FROM base as poetry
RUN pip install poetry
COPY /services/loans-model/poetry.lock /services/loans-model/pyproject.toml /app/
RUN poetry export -o requirements.txt

FROM base as build
COPY ./services/loans-model .
COPY --from=poetry /app/requirements.txt /tmp/requirements.txt
RUN python -m venv .venv && \
    .venv/bin/pip install wheel && \
    .venv/bin/pip install -r /tmp/requirements.txt
RUN . /app/.venv/bin/activate && python dump_model.py

FROM base as runner
ENV PATH=/app/.venv/bin:$PATH
ARG LOANS_MODEL_PORT
ENV LOANS_MODEL_PORT=${LOANS_MODEL_PORT}
ARG CLIENT_PORT
ENV CLIENT_PORT=${CLIENT_PORT}
COPY --from=build /app/.venv /app/.venv
COPY --from=build /app/app.py .
COPY --from=build /app/pipeline.joblib .
COPY --from=build /app/utils/ ./utils/
CMD . /app/.venv/bin/activate && python app.py