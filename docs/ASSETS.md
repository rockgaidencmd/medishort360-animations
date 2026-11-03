# Registro de recursos 3D

Cada modelo de `public/models/` se registra en `public/models/assets.json`:

```json
{ "id": "webxr-hand", "file": "public/models/webxr-hand.glb",
  "source": "https://github.com/immersive-web/webxr-input-profiles",
  "license": "MIT", "attribution": "…", "commercialUse": true, "approvedBy": "tu nombre" }
```

- `scripts/validate.ts` falla si hay un modelo sin registro.
- Un recurso con `commercialUse: false` bloquea cualquier proyecto con `"commercial": true`.
- `approvedBy` es obligatorio para el render final.
- Los dos recursos del proyecto vasopresores vienen pre-llenados con las licencias que indicaste (MIT y CC0). Ajusta `file` al nombre real y confirma la licencia en la fuente antes de aprobar.
- Z-Anatomy / BodyParts3D: candidatos, no integrados. Revisa la licencia de cada estructura antes de registrarla.
