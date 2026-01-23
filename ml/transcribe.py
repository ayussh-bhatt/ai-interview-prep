import sys
import whisper

if len(sys.argv) < 2:
    print("No audio file provided")
    sys.exit(1)

audio_path = sys.argv[1]

model = whisper.load_model("base")  # base = good balance
result = model.transcribe(audio_path)

print(result["text"])
