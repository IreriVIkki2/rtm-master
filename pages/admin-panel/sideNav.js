import { useRouter } from "next/router";
import firebaseCRUD from "../../utils/firebaseCRUD";
import Link from "next/link";

export default () => {
    const router = useRouter();

    const handleNewProgramClick = async () => {
        await firebaseCRUD
            .createNewProgram()
            .then(pid => router.push(`/admin-panel/programs/edit/${pid}`))
            .catch(err => console.error(err));
    };

    return (
        <aside
            style={{
                marginRight: "20px",
                borderRight: "solid black 1px",
                paddingRight: "20px",
            }}
        >
            <div>
                <small>hide words</small>
                <ul>
                    <li>
                        <Link href="/admin-panel">
                            <a>Dashboard</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin-panel/programs">
                            <div>
                                <a>Programs</a>
                                <ul>
                                    <li>
                                        <Link href="/admin-panel/programs">
                                            <a>All programs</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <span
                                            style={{
                                                cursor: "pointer",
                                                color: "blue",
                                            }}
                                            onClick={handleNewProgramClick}
                                        >
                                            <a>New program</a>
                                        </span>
                                    </li>
                                    <li>
                                        <Link href="/admin-panel/programs">
                                            <a>Drafts</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin-panel/blogs">
                            <a>Blogs</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin-panel/posts">
                            <a>Posts</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin-panel/settings">
                            <a>Settings</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
};
