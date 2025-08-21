import { Link } from "react-router-dom";
import configurationService from "../../services/configuration/configuration";
type PostCardProps = {
  $id: string;
  title: string;
  featuredImage: string;
};

const PostCard = ({ $id, title, featuredImage }: PostCardProps) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full flex justify-center mb-4">
          <img
            src={configurationService.getFilePreview(featuredImage)}
            alt="Featured image"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-50">{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
