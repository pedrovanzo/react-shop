import { Link } from "react-router";
import { productPath } from "../../lib/productPath";

interface TopicTagProps {
    name: string;
}

// Lean pill linking to a product page
export default function TopicTag({ name }: TopicTagProps) {
    return (
        <Link
            to={{ pathname: productPath(name) }}
            className="inline-block max-w-full truncate rounded-full px-3 py-1 text-sm bg-default/10 text-default/80 hover:bg-default/20 hover:text-default"
        >
            {name}
        </Link>
    );
}
