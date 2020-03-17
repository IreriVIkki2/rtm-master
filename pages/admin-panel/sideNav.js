import { useRouter } from "next/router";
import firebaseCRUD from "../../utils/firebaseCRUD";
import Link from "../../components/Link";

export default () => {
    const router = useRouter();

    const handleNewProgramClick = async () => {
        await firebaseCRUD
            .createNewProgram()
            .then(pid => router.push(`/admin-panel/programs/edit/${pid}`))
            .catch(err => console.error(err));
    };

    return (
        <ul className="al-aside">
            <li>
                <Link
                    activeClassName="al__navbar-link-active"
                    href="/admin-panel"
                >
                    <a className="al__navbar-link">Dashboard</a>
                </Link>
            </li>
            <li>
                <ul className="al__navbar-dropdown">
                    <li>
                        <Link
                            activeClassName="al__navbar-link-active"
                            href="/admin-panel/programs"
                        >
                            <a className="al__navbar-link">All programs</a>
                        </Link>
                    </li>
                    <li onClick={handleNewProgramClick}>
                        <a className="al__navbar-link">New program</a>
                    </li>
                    <li>
                        <Link
                            activeClassName="al__navbar-link-active"
                            href="/admin-panel/programs/drafts"
                        >
                            <a className="al__navbar-link">Drafts</a>
                        </Link>
                    </li>
                </ul>
            </li>
            <li>
                <Link
                    activeClassName="al__navbar-link-active"
                    href="/admin-panel/blogs"
                >
                    <a className="al__navbar-link">Blogs</a>
                </Link>
            </li>
            <li>
                <Link
                    activeClassName="al__navbar-link-active"
                    href="/admin-panel/posts"
                >
                    <a className="al__navbar-link">Posts</a>
                </Link>
            </li>
            <li>
                <Link
                    activeClassName="al__navbar-link-active"
                    href="/admin-panel/settings"
                >
                    <a className="al__navbar-link">Settings</a>
                </Link>
            </li>
            <li>
                <small>make this fixed --ntm</small>
            </li>
        </ul>
    );
};
