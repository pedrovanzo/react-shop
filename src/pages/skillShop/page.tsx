import { useState } from "react";
import Navbar from "../../components/navigation/navbar";
import PageHeader from "../../components/header/pageHeader";
import FiltersButton from "../../components/skill/filtersButton";
import SkillShopSection from "../../components/skill/skillShopSection";

export default function SkillShop() {
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    return (
        <>
            <Navbar actions={<FiltersButton onClick={() => setIsFiltersOpen(true)} />} />
            <SkillShopSection
                header={
                    <PageHeader
                        title="Skill Shop"
                        description="Browse the skills and equip them to make a build"
                    />
                }
                isFiltersOpen={isFiltersOpen}
                onFiltersOpenChange={setIsFiltersOpen}
            />
        </>
    );
}
