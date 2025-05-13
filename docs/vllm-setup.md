# vLLM Installation Guide (WhiteRabbitNeo-13B-v1)

This guide offers two pain-free ways to run the **WhiteRabbitNeo-13B-v1** model with [vLLM](https://github.com/vllm-project/vllm) on Windows, macOS or Linux.

---
## 1. GPU Docker Image (recommended)

1. Install **Docker Desktop** and enable GPU support (Settings ▸ Resources ▸ *Enable GPU*).
2. Pull the pre-built vLLM CUDA image:

   ```powershell
   docker pull ghcr.io/vllm-project/vllm:latest
   ```
3. Run the container and mount a cache directory for Hugging Face models:

   ```powershell
   docker run --gpus all -p 8000:8000 -v %USERPROFILE%\.cache\huggingface:/root/.cache/huggingface ghcr.io/vllm-project/vllm:latest \
     --model WhiteRabbitNeo/WhiteRabbitNeo-13B-v1 --dtype float16 --port 8000
   ```
4. Test the REST endpoint:

   ```bash
   curl http://localhost:8000/generate -d '{"prompt":"Hello Web3"}'
   ```

---
## 2. Local Python ≥ 3.11 with pre-built wheels

> ⚠️  Building `sentencepiece` from source on Windows-x64 requires **CMake** and MSVC. Follow these steps only if you can't use Docker.

```powershell
# Install Python 3.11 from the official installer
py -3.11 -m venv vllm-env
vllm-env\Scripts\activate

pip install --upgrade pip wheel
pip install torch --index-url https://download.pytorch.org/whl/cu121
pip install sentencepiece==0.2.0 --only-binary=:all:
# Finally install vllm
pip install vllm

python -m vllm.entrypoints.api_server --model WhiteRabbitNeo/WhiteRabbitNeo-13B-v1 --dtype float16 --port 8000
```

If `sentencepiece` wheels are not available for your sub-architecture, install **Visual Studio Build Tools** + **CMake** and rerun `pip install sentencepiece`.

---
## 3. Using from Node.js

Once vLLM is running on port 8000 you can query it directly from DevForge:

```javascript
import axios from 'axios';

export async function llm(prompt) {
  const { data } = await axios.post('http://localhost:8000/generate', {
    prompt,
    top_p: 0.9,
    temperature: 0.7,
    max_tokens: 256,
  });
  return data.text;
}
```

---
### References

* WhiteRabbitNeo model card – <https://huggingface.co/WhiteRabbitNeo/WhiteRabbitNeo-13B-v1>
* vLLM docs – <https://docs.vllm.ai> 