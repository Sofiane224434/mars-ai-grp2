import icon_valid from "../../assets/icons/icon_valid.png";
import icon_refuse from "../../assets/icons/icon_refuse.png";
import icon_review from "../../assets/icons/icon_review.png";
import icon_wait from "../../assets/icons/icon_wait.png";

const STATUS_VARIANTS = {
  rejected: {
    container: "bg-red-500 border-brulure-despespoir text-brulure-despespoir",
    icon: icon_refuse,
  },
  approved: {
    container: "bg-vert-insecateur border-green-800 text-green-800",
    icon: icon_valid,
  },
  review: {
    container: "bg-jaune-simpson border-orange-genial text-yellow-800",
    icon: icon_review,
  },
  pending: {
    container: "bg-gris-magneti border-gray-800 text-gray-800",
    icon: icon_wait,
  },
  top50: {
    container: "bg-bleu-ocean border-blue-900 text-white",
    icon: icon_valid,
  },
};

const StatusBadge = ({
  variant = "pending",
  children = "Status",
  className = "",
}) => {
  const baseStyles =
    "flex items-center gap-1 px-3.5 py-1 rounded-full border border-solid w-fit h-fit transition-all";
  const currentVariant = STATUS_VARIANTS[variant] || STATUS_VARIANTS.pending;

  return (
    <div className={`${baseStyles} ${currentVariant.container} ${className}`}>
      <div>
        <div className="status-base" />
        <img className="status-base-icon" alt="Icon" src={currentVariant.icon} />
      </div>
      <span className="relative z-10">{children}</span>
    </div>
  );
};

export { StatusBadge, StatusBadge as Status };
export default StatusBadge;
