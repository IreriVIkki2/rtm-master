import Link from "next/link";

export default () => {
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
                                        <Link
                                            href={`/admin-panel/programs/edit/${"asdf"}`}
                                        >
                                            <a>New program</a>
                                        </Link>
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
