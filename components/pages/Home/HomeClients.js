import { IoIosAdd } from "react-icons/io";

const HomeClients = () => {
    const hovered = i => {
        document.getElementById(`client${i}`).scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
        });
    };
    return (
        <section className="clients">
            <p className="title title--sm ml-7 mb-3">Trusted by</p>
            <h2 className="title title--lg ml-7">Satisfied</h2>
            <div className="clients__container pl-7">
                <h2 className="title title--lg mb-7 text-white">clients</h2>
                <div className="clients__items mb-7">
                    {testimonials.map((t, i) => {
                        return (
                            <div
                                key={i}
                                id={`client${i}`}
                                className="clients__item"
                                onClick={() => hovered(i)}
                            >
                                <img
                                    src={t.photo}
                                    className="img-cover clients__item--img"
                                />
                                <div className="clients__item--meta title--md">
                                    <p className="font-smaller clients__item--testimonial">
                                        <span className="title--md clients__item--name">
                                            <span>{t.name}</span>
                                            <span className="ml-1 text-secondary">
                                                <IoIosAdd />
                                            </span>
                                        </span>
                                        <span className="clients__item--testimonial-message">
                                            {t.message}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="clients__scrollbar mt-7"></div>
        </section>
    );
};

export default HomeClients;

const testimonials = [
    {
        name: "John Doe",
        photo: "/images/pexels1.jpg",
        message:
            " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae, repudiandae quisquam mollitia velit totam, animi nihil nostrum sit rem aspernatur pariatur minus. Dolore quod harum quibusdam. Reiciendis perspiciatis praesentium commodi!",
    },
    {
        name: "John Doe",
        photo: "/images/pexels2.jpg",
        message:
            " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae, repudiandae quisquam mollitia velit totam, animi nihil nostrum sit rem aspernatur pariatur minus. Dolore quod harum quibusdam. Reiciendis perspiciatis praesentium commodi!",
    },
    {
        name: "Jane Doe",
        photo: "/images/pexels5.jpg",
        message:
            " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae, repudiandae quisquam mollitia velit totam, animi nihil nostrum sit rem aspernatur pariatur minus. Dolore quod harum quibusdam. Reiciendis perspiciatis praesentium commodi!",
    },
    {
        name: "John Doe",
        photo: "/images/pexels4.jpg",
        message:
            " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae, repudiandae quisquam mollitia velit totam, animi nihil nostrum sit rem aspernatur pariatur minus. Dolore quod harum quibusdam. Reiciendis perspiciatis praesentium commodi!",
    },
    {
        name: "Jane Doe",
        photo: "/images/pexels6.jpg",
        message:
            " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae, repudiandae quisquam mollitia velit totam, animi nihil nostrum sit rem aspernatur pariatur minus. Dolore quod harum quibusdam. Reiciendis perspiciatis praesentium commodi!",
    },
    {
        name: "John Doe",
        photo: "/images/pexels5.jpg",
        message:
            " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae, repudiandae quisquam mollitia velit totam, animi nihil nostrum sit rem aspernatur pariatur minus. Dolore quod harum quibusdam. Reiciendis perspiciatis praesentium commodi!",
    },
];
