FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY api/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy API code
COPY api/main.py .

# Hugging Face Spaces requires port 7860
EXPOSE 7860

# Run with uvicorn on port 7860 (HF Spaces requirement)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
