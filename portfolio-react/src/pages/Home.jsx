import styled from "styled-components";
import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";
import ProjectCard from "../components/ProjectCard";

const Page = styled.main`
  max-width: 1100px;
  margin: 0 auto;
  padding: 2.25rem 1.25rem 3.5rem;
`;

const GridTop = styled.section`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 1.25rem;
  margin-top: 0.75rem;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.section`
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: rgba(2, 6, 23, 0.55);
  border-radius: 18px;
  padding: 1.35rem;
`;

const Pill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.7rem;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: rgba(148, 163, 184, 0.06);
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 700;
  font-size: 0.85rem;
`;

const H1 = styled.h1`
  margin: 0.85rem 0 0.35rem;
  font-size: 2.35rem;
  line-height: 1.08;

  @media (max-width: 560px) {
    font-size: 1.9rem;
  }
`;

const Subtitle = styled.p`
  margin: 0.35rem 0 0.9rem;
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 700;
`;

const Lead = styled.p`
  margin: 0.8rem 0 1.1rem;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.6;
`;

const CTArow = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 0.9rem;
`;

const PrimaryBtn = styled(Link)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0.65rem 0.95rem;
  border-radius: 12px;
  font-weight: 900;
  border: 1px solid rgba(37, 99, 235, 0.55);
  background: rgba(37, 99, 235, 0.18);
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    border-color: rgba(37, 99, 235, 0.85);
  }
`;

const SecondaryBtn = styled(Link)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0.65rem 0.95rem;
  border-radius: 12px;
  font-weight: 900;
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: rgba(148, 163, 184, 0.08);
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    border-color: rgba(37, 99, 235, 0.55);
  }
`;

const MiniGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
  margin-top: 1rem;

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;

const MiniCard = styled.div`
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: rgba(2, 6, 23, 0.45);
  border-radius: 14px;
  padding: 0.85rem;
`;

const MiniTitle = styled.div`
  font-weight: 900;
  margin-bottom: 0.25rem;
`;

const MiniText = styled.div`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.92rem;
  line-height: 1.35;
`;

const Section = styled.section`
  margin-top: 1.5rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  margin: 0.25rem 0 0.75rem;
`;

const H2 = styled.h2`
  margin: 0;
  font-size: 1.25rem;
`;

const Hint = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.95rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.85rem;

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const Feature = styled.div`
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: rgba(2, 6, 23, 0.5);
  border-radius: 16px;
  padding: 1rem;
`;

const FeatureTitle = styled.h3`
  margin: 0 0 0.35rem;
  font-size: 1rem;
`;

const FeatureText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.45;
  font-size: 0.95rem;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.9rem;

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const EmptyState = styled.div`
  border: 1px dashed rgba(148, 163, 184, 0.22);
  background: rgba(2, 6, 23, 0.35);
  border-radius: 16px;
  padding: 1rem;
  color: ${({ theme }) => theme.colors.muted};
`;

const BottomCTA = styled.section`
  margin-top: 1.5rem;
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: rgba(2, 6, 23, 0.55);
  border-radius: 18px;
  padding: 1.25rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const BottomTitle = styled.h3`
  margin: 0 0 0.25rem;
`;

const BottomText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.5;
`;

export default function Home() {
  const fav = useContext(FavoritesContext);

  const featured = useMemo(() => {
    const list = fav?.favorites ?? [];
    return list.slice(0, 6);
  }, [fav?.favorites]);

  return (
    <Page>
      <GridTop>
        <Panel>
          <Pill>Disponible para oportunidades</Pill>
          <H1>
            Hola, soy Marcos <span aria-hidden="true">👋</span>
          </H1>
          <Subtitle>Desarrollador Web Full Stack</Subtitle>
          <Lead>
            Construyo aplicaciones con enfoque en producto: interfaces claras,
            consumo de APIs, buenas prácticas, rendimiento y despliegue.
          </Lead>

          <CTArow>
            <PrimaryBtn to="/projects">Ver proyectos</PrimaryBtn>
            <SecondaryBtn to="/contact">Contactar</SecondaryBtn>
          </CTArow>

          <MiniGrid>
            <MiniCard>
              <MiniTitle>Pila</MiniTitle>
              <MiniText>React · Vite · Router · API REST</MiniText>
            </MiniCard>
            <MiniCard>
              <MiniTitle>Deploy</MiniTitle>
              <MiniText>Vercel</MiniText>
            </MiniCard>
          </MiniGrid>
        </Panel>

        <Panel>
          <H2>Resumen rápido</H2>
          <Hint style={{ marginTop: ".35rem" }}>
            Portfolio con React + Vite consumiendo datos reales desde GitHub API,
            con rutas, estados, custom hooks, contexto y formulario.
          </Hint>

          <MiniGrid>
            <MiniCard>
              <MiniTitle>3+</MiniTitle>
              <MiniText>Páginas con Router</MiniText>
            </MiniCard>
            <MiniCard>
              <MiniTitle>API</MiniTitle>
              <MiniText>GitHub REST</MiniText>
            </MiniCard>
            <MiniCard>
              <MiniTitle>UX</MiniTitle>
              <MiniText>Responsive + CTA</MiniText>
            </MiniCard>
            <MiniCard>
              <MiniTitle>Limpio</MiniTitle>
              <MiniText>Arquitectura clara</MiniText>
            </MiniCard>
          </MiniGrid>

          <Hint style={{ marginTop: ".85rem" }}>
            Consejo: marca proyectos como <b>destacados</b> y aparecerán aquí.
          </Hint>
        </Panel>
      </GridTop>

      <Section>
        <SectionHeader>
          <H2>Qué hago</H2>
          <Hint>Claridad, rendimiento y componentes reutilizables.</Hint>
        </SectionHeader>

        <FeaturesGrid>
          <Feature>
            <FeatureTitle>Frontend moderno</FeatureTitle>
            <FeatureText>
              UI responsive, componentes reutilizables y buenas prácticas con React.
            </FeatureText>
          </Feature>
          <Feature>
            <FeatureTitle>Consumo de APIs</FeatureTitle>
            <FeatureText>
              Peticiones con control de carga/error y manejo de datos reales.
            </FeatureText>
          </Feature>
          <Feature>
            <FeatureTitle>Arquitectura limpia</FeatureTitle>
            <FeatureText>
              Estructura por páginas, hooks, contexto y estilos para escalar.
            </FeatureText>
          </Feature>
          <Feature>
            <FeatureTitle>Deploy profesional</FeatureTitle>
            <FeatureText>
              Desplegado en Vercel, listo para enseñar a empresas.
            </FeatureText>
          </Feature>
        </FeaturesGrid>
      </Section>

      <Section>
        <SectionHeader>
          <H2>Proyectos destacados</H2>
          <Hint>
            Selección rápida. Para ver todo:{" "}
            <Link to="/projects" style={{ textDecoration: "underline" }}>
              Proyectos
            </Link>
          </Hint>
        </SectionHeader>

        {featured.length === 0 ? (
          <EmptyState>
            Aún no has marcado proyectos como destacados. Ve a <b>Proyectos</b> y pulsa{" "}
            <b>Destacar</b>.
          </EmptyState>
        ) : (
          <ProjectsGrid>
            {featured.map((p) => (
              <ProjectCard
                key={p.id}
                id={p.id}
                title={p.title}
                description={p.description}
                tags={p.tags}
                url={p.url}
              />
            ))}
          </ProjectsGrid>
        )}
      </Section>

      <BottomCTA>
        <div>
          <BottomTitle>¿Hablamos?</BottomTitle>
          <BottomText>
            Perfil full stack con frontend cuidado en React. Puedo aportarlo desde el primer día.
          </BottomText>
        </div>
        <CTArow style={{ marginTop: 0 }}>
          <PrimaryBtn to="/contact">Ir a contacto</PrimaryBtn>
          <SecondaryBtn to="/projects">Ver proyectos</SecondaryBtn>
        </CTArow>
      </BottomCTA>
    </Page>
  );
}
