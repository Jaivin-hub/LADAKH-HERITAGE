import { useRef, useState } from 'react';
import { ImagePlus, X, Star, Upload } from 'lucide-react';
import { uploadAdminImages, adminImageUrl } from '../../services/admin.js';

export default function ImageUploader({
  images,
  onChange,
  maxImages = 12,
  disabled,
  onBusyChange,
}) {
  const input = useRef(null);
  const lock = useRef(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [url, setUrl] = useState('');
  const busy = disabled || uploading;
  const upload = async (event) => {
    const files = Array.from(event.target.files || []);
    event.target.value = '';
    if (!files.length || lock.current) return;
    setError('');
    if (files.length + images.length > maxImages)
      return setError(
        `Choose up to ${maxImages} image${maxImages === 1 ? '' : 's'} in total. Remove a photo to make room.`,
      );
    if (
      files.some(
        (file) =>
          !['image/jpeg', 'image/png', 'image/webp'].includes(file.type) ||
          file.size > 8 * 1024 * 1024,
      )
    )
      return setError('Choose JPG, PNG or WebP images, each 8 MB or smaller.');
    lock.current = true;
    setUploading(true);
    onBusyChange(true);
    try {
      const results = await uploadAdminImages(files);
      onChange([...images, ...results.map((image) => image.path)]);
    } catch (err) {
      setError(err.message || 'Upload failed. Please try again.');
    } finally {
      lock.current = false;
      setUploading(false);
      onBusyChange(false);
    }
  };
  const addUrl = () => {
    const value = url.trim();
    if (!/^https?:\/\//i.test(value) && !/^\/uploads\/[a-zA-Z0-9_./-]+$/.test(value))
      return setError('Enter an http(s) image URL or /uploads/ path.');
    if (images.includes(value)) return setError('This image is already in the gallery.');
    onChange([...images, value]);
    setUrl('');
    setError('');
  };
  return (
    <div className="admin-image-manager" aria-busy={uploading}>
      <input
        ref={input}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple={maxImages > 1}
        hidden
        onChange={upload}
        disabled={busy || images.length >= maxImages}
        aria-label="Choose images to upload"
      />
      <button
        type="button"
        className="admin-upload-zone"
        disabled={busy || images.length >= maxImages}
        onClick={() => input.current.click()}
      >
        <Upload size={24} />
        <strong>
          {uploading
            ? 'Uploading your photos…'
            : maxImages === 1
              ? 'Upload category image'
              : 'Upload product photos'}
        </strong>
        <span>JPG, PNG or WebP · up to 8 MB each</span>
        <small>
          {maxImages === 1
            ? 'Choose one photo'
            : `Select multiple photos · ${images.length} of ${maxImages} added`}
        </small>
      </button>
      {error && (
        <p className="admin-error" role="alert">
          {error}
        </p>
      )}
      <p className="admin-field-help" role="status">
        {uploading
          ? 'Please wait for the upload to finish before saving.'
          : 'The first photo is the main image shown on your product or category card.'}
      </p>
      {!!images.length && (
        <div className="admin-upload-grid">
          {images.map((image, index) => (
            <div className="admin-upload-item" key={image}>
              <img src={adminImageUrl(image)} alt={`Selected photo ${index + 1}`} />
              <button
                type="button"
                className="admin-upload-remove"
                disabled={busy}
                aria-label={`Remove photo ${index + 1}`}
                onClick={() => onChange(images.filter((_, i) => i !== index))}
              >
                <X size={15} />
              </button>
              <button
                type="button"
                className={`admin-upload-main ${index === 0 ? 'is-main' : ''}`}
                disabled={busy || index === 0}
                onClick={() => onChange([image, ...images.filter((_, i) => i !== index)])}
              >
                <Star size={13} />
                {index === 0 ? 'Main image' : 'Make main'}
              </button>
            </div>
          ))}
        </div>
      )}
      <details className="admin-url-option">
        <summary>Or use an image URL</summary>
        <label className="admin-field">
          Image URL
          <input
            type="text"
            maxLength={2000}
            value={url}
            disabled={busy || images.length >= maxImages}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://… or /uploads/filename.webp"
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                if (!busy && images.length < maxImages) addUrl();
              }
            }}
          />
        </label>
        <button
          type="button"
          className="admin-button"
          disabled={busy || !url.trim() || images.length >= maxImages}
          onClick={addUrl}
        >
          <ImagePlus size={16} />
          Add image
        </button>
      </details>
    </div>
  );
}
