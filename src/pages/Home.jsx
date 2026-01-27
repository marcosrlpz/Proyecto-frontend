import styled from "styled-components";
import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import ProjectCard from "../components/ProjectCard";

const Hero = styled.section`
  display: grid;
  gap: 0.8rem;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.4rem;
  letter-spacing: -0.04em;

  @media (max-width: 640px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  max-width: 65ch;
`;

const SectionTitle = styled.h2`
  font-size: 1.35rem;
  margin: 2rem 0 1rem;
`;

const Grid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Empty = styled.div`
  padding: 1rem;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 16px;
  background: rgba(2, 6, 23, 0.5);
  color: ${({ theme }) => theme.colors.muted};
`;

const Home = () => {
  const fav = useContext(FavoritesContext);

  return (
    <>
      <Hero>
        <Title>Hola, soy Marcos 👋</Title>
        <Subtitle>
          Frontend Developer enfocado en React. Aquí tienes una selección de mis
          proyectos y una forma directa de contactarme.
        </Subtitle>
      </Hero>

      <SectionTitle>Proyectos destacados</SectionTitle>

      {fav.favorites.length === 0 ? (
        <Empty>
          Aún no has marcado proyectos como destacados. Ve a{" "}
          <strong>Proyectos</strong> y pulsa “Destacar” en los que quieras
          mostrar aquí.
        </Empty>
      ) : (
        <Grid>
          {fav.favorites.slice(0, 6).map((p) => (
            <ProjectCard
              key={p.id}
              id={p.id}
              title={p.title}
              description={p.description}
              tags={p.tags}
              url={p.url}
            />
          ))}
        </Grid>
      )}
    </>
  );
};

export default Home;
