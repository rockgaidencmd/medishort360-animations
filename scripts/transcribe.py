#!/usr/bin/env python3
"""Transcribe el audio original de un proyecto con Whisper local (faster-whisper).

Uso:  python3 scripts/transcribe.py <proyecto> [--model small] [--language es]
Requiere:  pip install faster-whisper
Escribe projects/<proyecto>/transcript.json con frases, palabras, tiempos y confianza.
La alineación SIEMPRE debe revisarse a mano (nombres de fármacos, cifras, tiempos).
"""
import argparse
import json
import math
import shutil
from pathlib import Path

from faster_whisper import WhisperModel


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("project")
    ap.add_argument("--model", default="small", help="tiny|base|small|medium|large-v3")
    ap.add_argument("--language", default="es")
    args = ap.parse_args()

    root = Path.cwd()
    pdir = root / "projects" / args.project
    manifest = json.loads((pdir / "manifest.json").read_text(encoding="utf-8"))
    audio = root / "public" / manifest["audio"]
    if not audio.exists():
        raise SystemExit(f"No existe {audio}. Copia el audio original ahí primero.")

    model = WhisperModel(args.model, device="cpu", compute_type="int8")
    segments, info = model.transcribe(
        str(audio), language=args.language, word_timestamps=True, vad_filter=True
    )

    out_segments = []
    low = 0
    for i, seg in enumerate(segments):
        words = [
            {
                "word": w.word.strip(),
                "start": round(w.start, 3),
                "end": round(w.end, 3),
                "confidence": round(float(w.probability), 3),
            }
            for w in (seg.words or [])
        ]
        low += sum(1 for w in words if w["confidence"] < 0.5)
        out_segments.append(
            {
                "id": i,
                "start": round(seg.start, 3),
                "end": round(seg.end, 3),
                "text": seg.text.strip(),
                "confidence": round(max(0.0, min(1.0, math.exp(seg.avg_logprob))), 3),
                "words": words,
            }
        )

    target = pdir / "transcript.json"
    if target.exists():
        shutil.copy(target, pdir / "transcript.prev.json")
        print("Copia de seguridad: transcript.prev.json")

    target.write_text(
        json.dumps(
            {
                "source": "whisper",
                "language": args.language,
                "model": args.model,
                "durationSec": round(info.duration, 3),
                "segments": out_segments,
            },
            ensure_ascii=False,
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )
    print(f"{len(out_segments)} segmentos, {info.duration:.2f} s -> {target}")
    if low:
        print(f"AVISO: {low} palabra(s) con confianza < 0.5. Revisa la alineación antes de dirigir las escenas.")


if __name__ == "__main__":
    main()
