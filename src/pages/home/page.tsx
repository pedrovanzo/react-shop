import { Link } from "react-router";
import Navbar from "../../components/navigation/navbar";
import ProfilePhoto from "../../components/profile/profilePhoto";
export default function Home() {
    return (
        // body has p-4, so the page fills the remaining 100dvh minus 2rem
        <div className="h-[calc(100dvh-2rem)] flex flex-col">
            <Navbar />
            <section className="flex-1 min-h-0 flex items-center justify-center px-2 text-default">
                {/* Below lg: centered vertical stack. lg+: photo left, text rows follow its curve */}
                <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-0">
                    <ProfilePhoto className="size-28 lg:size-64" />
                    {/*
                      Each row's lg margin keeps ~40px between its left edge and the circle (256px).
                      Offsets come from the circle's edge at each row's vertical center:
                      rows near the top and bottom sit closer (negative margins), middle rows further out.
                    */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                        <p className="mb-2 lg:-ml-[51px] text-sm font-medium uppercase tracking-[0.25em] leading-5 text-default/60">
                            Pedro Vanzo's
                        </p>
                        <h1 className="lg:ml-[28px] whitespace-nowrap text-[clamp(3rem,18vw,6rem)] font-semibold tracking-[-0.03em] leading-[1.05]">
                            <span className="relative inline-block">
                                Skill
                                <span
                                    className="absolute left-0 bottom-[-0.08em] h-[0.08em] w-full rounded-full bg-primary"
                                    aria-hidden="true"
                                ></span>
                            </span>{" "}
                            Shop
                        </h1>
                        <p className="mt-4 max-w-md lg:max-w-none text-base lg:text-lg font-light leading-relaxed text-default/60">
                            <span className="lg:block lg:ml-[37px]">
                                Browse the frontend concepts I work with every day.
                            </span>{" "}
                            <span className="lg:block lg:ml-[27px]">
                                No checkout required, just definitions and examples.
                            </span>
                        </p>
                        <Link
                            to={{ pathname: "/products" }}
                            className="mt-6 lg:-ml-[29px] px-6 py-3 rounded-full text-sm font-medium tracking-wide leading-none text-contrast bg-default"
                        >
                            Browse products
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
