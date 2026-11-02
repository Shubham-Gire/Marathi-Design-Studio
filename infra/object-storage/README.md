# Object Storage Architecture & 10 GB Dual Limit Policy

Marathi Design Studio enforces strict storage quotas across two distinct domains:

1. **Template Library (Strict Max 10 GB)**:
   - S3 / MinIO Bucket: `marathi-templates`
   - Content: Pre-made starter templates, thumbnail previews, typography manifests.
   - Enforced by: `services/template-service/src/main/java/com/marathidesign/template/service/StorageAccountingService.java`
   - Maximum capacity: `10,737,418,240 bytes (10.00 GB)`
   - Deduplication: SHA-256 content hashes prevent duplicate template upload storage consumption.

2. **Reusable Element Library (Strict Max 10 GB)**:
   - S3 / MinIO Bucket: `marathi-elements`
   - Content: Scalable Devanagari calligraphy SVGs, festive borders, stickers, badges, vector ornaments.
   - Maximum capacity: `10,737,418,240 bytes (10.00 GB)`
   - Deduplication: SHA-256 content hash check before accepting uploads.

3. **User Media Uploads (Separately Accounted)**:
   - Free users: 500 MB personal storage.
   - Pro users: 50 GB high-capacity storage.
