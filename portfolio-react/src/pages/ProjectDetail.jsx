import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { useFetch } from "../hooks/useFetch";

const Wrapper = styled.section`
  display: grid;
  gap: 1rem;
`;

const Back = styled(Link)`
  width: fit-content;
  padding: 0.55rem 0.85rem;
  border-radius: 12px;
  font-weight: 800;
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: rgba(148, 163, 184, 0.08);
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    border-color: rgba(37, 99, 235, 0.6);
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  letter-spacing: -0.03em;
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  color: ${({ theme }) => theme.colors.muted};
`;

const Pill = styled.span`
  padding: 0.35rem 0.6rem;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: rgba(2, 6, 23, 0.5);
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  max-width: 75ch;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
`;

const ButtonLink = styled.a`
  padding: 0.7rem 1rem;
  border-radius: 14px;
  font-weight: 900;
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: rgba(37, 99, 235, 0.18);
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    border-color: rgba(37, 99, 235, 0.6);
  }
`;

const StateBox = styled.div`
  padding: 1rem;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 16px;
  background: rgba(2, 6, 23, 0.5);
  color: ${({ theme }) => theme.colors.muted};
`;

const ProjectDetail = () => {
  const { repo } = useParams();
  const githubUser = "marcosrlpz";
  const url = `https://api.github.com/repos/${githubUser}/${repo}`;

  const { data, loading, error } = useFetch(url);

  return (
    <Wrapper>
      <Back to="/projects">← Volver a Proyectos</Back>

      {loading && !data && <StateBox>Cargando detalle...</StateBox>}

      {error && (
        <StateBox>
          No se pudo cargar el proyecto:
          <br />
          {String(error.message || error)}
        </StateBox>
      )}

      {!error && data && (
        <>
          <Title>{data.name}</Title>

          <Meta>
            <Pill>⭐ Stars: {data.stargazers_count}</Pill>
            <Pill>🍴 Forks: {data.forks_count}</Pill>
            <Pill>🛠 Lenguaje: {data.language || "—"}</Pill>
            <Pill>🔒 Visibilidad: {data.visibility}</Pill>
          </Meta>

          <Description>{data.description || "Sin descripción."}</Description>

          <Actions>
            <ButtonLink href={data.html_url} target="_blank" rel="noreferrer">
              Ver en GitHub
            </ButtonLink>

            {data.homepage && (
              <ButtonLink href={data.homepage} target="_blank" rel="noreferrer">
                Demo / Web
              </ButtonLink>
            )}
          </Actions>
        </>
      )}
    </Wrapper>
  );
};

export default ProjectDetail;
