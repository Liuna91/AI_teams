"""LLM 服务封装，支持 OpenAI 及兼容接口"""
import openai
from app.core.config import get_settings

settings = get_settings()

client = openai.AsyncOpenAI(
    api_key=settings.OPENAI_API_KEY,
    base_url=settings.OPENAI_BASE_URL,
)


async def chat_completion(
    messages: list,
    model: str = None,
    temperature: float = 0.7,
    max_tokens: int = 4096,
    stream: bool = False
) -> str:
    """通用对话接口"""
    model = model or settings.OPENAI_MODEL

    response = await client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=temperature,
        max_tokens=max_tokens,
        stream=stream,
    )

    if stream:
        return response  # 返回流式对象
    return response.choices[0].message.content


async def structured_output(
    messages: list,
    schema: dict,
    model: str = None,
) -> dict:
    """结构化输出（JSON Mode）"""
    model = model or settings.OPENAI_MODEL

    response = await client.chat.completions.create(
        model=model,
        messages=messages,
        response_format={"type": "json_object"},
        temperature=0.2,
    )

    import json
    content = response.choices[0].message.content
    return json.loads(content)
