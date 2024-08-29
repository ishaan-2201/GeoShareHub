import "./Avatar.css";
export default function Avatar({ className, style, image, width }) {
  return (
    <div className={`avatar ${className}`} style={style}>
      <img src={image} style={{ width: width, height: width }} />
    </div>
  );
}
