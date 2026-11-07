"""Búsqueda léxica: Unicode, signos, acentos y fragmentación; nunca inventa tiempos."""
import re,unicodedata
def normalize(s):
 return re.sub(r'[^a-z0-9]','', ''.join(c for c in unicodedata.normalize('NFKD',s.lower()) if not unicodedata.combining(c)))
def find(words,phrase,occurrence=0):
 needle=normalize(phrase);hits=[]
 for i in range(len(words)):
  value=''
  for j in range(i,min(i+12,len(words))):
   value+=normalize(words[j]['word'])
   if value==needle: hits.append((i,j));break
   if not needle.startswith(value):break
 if len(hits)<=occurrence:return None
 i,j=hits[occurrence]
 return {'query':phrase,'start':words[i]['start'],'end':words[j]['end'],'fromWord':i,'toWord':j,'actual':' '.join(w['word'] for w in words[i:j+1])}
