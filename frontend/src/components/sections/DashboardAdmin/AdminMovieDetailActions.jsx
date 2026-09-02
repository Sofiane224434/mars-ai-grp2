import Button from '../../UI/Button.jsx';

const AdminMovieDetailActions = ({ onAssignClick, onEmailClick }) => {
  return (
    <div className="mt-4">
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          interactive
          variant="email-send"
          className="h-12 min-h-12"
          onClick={onAssignClick}
        >
          Assigner cette vidéo à un jury
        </Button>

        <Button
          interactive
          variant="email-admin"
          className="h-12 min-h-12"
          onClick={onEmailClick}
        >
          Envoyer un email
        </Button>
      </div>
    </div>
  );
};

export default AdminMovieDetailActions;