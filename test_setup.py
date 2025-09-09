from openai import OpenAI
client = OpenAI()

completion = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {
            "role": "user",
            "content": "Write a joke about Large Language Models."
        }
    ]
)

print(completion.choices[0].message.content)
