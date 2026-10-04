# Portfolio image workflow

The owner requests this workflow for future design uploads:

- Add new designs to the start of the requested gallery section, following any explicit ordering. Keep existing designs in their current relative order and avoid duplicates.
- Export new gallery images as optimized, fully decoded WebP files. Preserve all text, logos, product details, and the intended aspect ratio. Never stretch square artwork into portrait dimensions.
- Use 864×1080 for ordinary 4:5 web exports, or 1080×1350 when explicitly requested or needed for text clarity. Aim for roughly 50–250 KB per image without sacrificing legibility.
- Keep the first six feed images eager-loaded, the first three at high fetch priority, and the remaining images lazy-loaded, with asynchronous decoding.
- Verify dimensions and full image decoding before upload. Transfer complete binary files; never truncate base64 payloads. Check uploaded blob hashes and verify the deployment when available.
