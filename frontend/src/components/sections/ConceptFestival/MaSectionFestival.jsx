import ConceptFestival from './ConceptFestival';
import PodiumGraphic from './PodiumGraphic';

export default function MaSectionFestival() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between w-full px-6 py-12 lg:px-20 gap-10">
      <div className="w-full md:w-1/2">
        <ConceptFestival />
      </div>

      <div className="w-full md:w-1/2 flex justify-center md:justify-end">
        <PodiumGraphic />
      </div>

    </section>
  );
}