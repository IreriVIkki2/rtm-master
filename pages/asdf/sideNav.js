import Link from "../../components/Link";

export default () => (
    <ul className="al-aside">
        <li>
            <Link
                activeClassName="al__navbar-link-active"
                href="/admin-panel/programs"
            >
                <a className="al__navbar-link">Programs</a>
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
    </ul>
);
