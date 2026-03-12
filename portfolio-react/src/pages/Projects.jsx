import styled from "styled-components";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import ProjectCard from "../components/ProjectCard";

const Header = styled.header`
  display: grid;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  letter-spacing: -0.03em;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  max-width: 65ch;
`;

const Grid = styled.section`
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

const StateBox = styled.div`
  padding: 1rem;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 16px;
  background: rgba(2, 6, 23, 0.5);
  color: ${({ theme }) => theme.colors.muted};
`;

const DetailLink = styled(Link)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding: 0.55rem 0.85rem;
  border-radius: 12px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: rgba(37, 99, 235, 0.18);

  &:hover {
    border-color: rgba(37, 99, 235, 0.6);
  }
`;

const CardWrap = styled.div`
  display: grid;
  gap: 0.65rem;
`;

const Projects = () => {
  const githubUser = "marcosrlpz";
  const url = `https://api.github.com/users/${githubUser}/repos?sort=updated`;

  const { data, loading, error } = useFetch(url);

  return (
    <>
      <Header>
        <Title>Proyectos</Title>
        <Subtitle>
          Repositorios públicos (GitHub API). Puedes marcar proyectos como
          destacados para que aparezcan en la Home.
        </Subtitle>
      </Header>

      {loading && !data && <StateBox>Cargando proyectos...</StateBox>}

      {error && (
        <StateBox>
          Ha ocurrido un error cargando proyectos:
          <br />
          {String(error.message || error)}
        </StateBox>
      )}

      {!error && Array.isArray(data) && (
        <Grid>
          {data
            .filter((repo) => !repo.fork)
            .slice(0, 12)
            .map((repo) => (
              <CardWrap key={repo.id}>
                <ProjectCard
                  id={repo.id}
                  title={repo.name}
                  description={repo.description || "Sin descripción"}
                  tags={repo.topics?.slice(0, 4) || []}
                  url={repo.html_url}
                />

                <DetailLink to={`/projects/${repo.name}`}>
                  Ver detalle
                </DetailLink>
              </CardWrap>
            ))}
        </Grid>
      )}
    </>
  );
};

export default Projects;
