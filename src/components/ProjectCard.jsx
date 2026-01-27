import styled from "styled-components";
import { useContext, useMemo } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

const Card = styled.article`
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: rgba(2, 6, 23, 0.6);
  border-radius: 18px;
  padding: 1.25rem;
  display: grid;
  gap: 0.9rem;
  transition: transform 120ms ease, border-color 120ms ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(37, 99, 235, 0.6);
  }
`;

const Title = styled.h3`
  font-size: 1.05rem;
  line-height: 1.2;
`;

const Desc = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.95rem;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span`
  font-size: 0.8rem;
  padding: 0.35rem 0.55rem;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.9;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const Button = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding: 0.55rem 0.85rem;
  border-radius: 12px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: rgba(148, 163, 184, 0.08);
  cursor: pointer;

  &:hover {
    border-color: rgba(37, 99, 235, 0.6);
  }
`;

const LinkBtn = styled.a`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding: 0.55rem 0.85rem;
  border-radius: 12px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: rgba(148, 163, 184, 0.08);

  &:hover {
    border-color: rgba(37, 99, 235, 0.6);
  }
`;

const ProjectCard = ({ id, title, description, tags = [], url }) => {
  const fav = useContext(FavoritesContext);

  const isFav = useMemo(() => fav?.isFavorite?.(id), [fav, id]);

  const projectPayload = useMemo(
    () => ({ id, title, description, tags, url }),
    [id, title, description, tags, url]
  );

  return (
    <Card>
      <Title>{title}</Title>
      <Desc>{description}</Desc>

      {tags.length > 0 && (
        <TagRow>
          {tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </TagRow>
      )}

      <Actions>
        <Button type="button" onClick={() => fav.toggleFavorite(projectPayload)}>
          {isFav ? "★ Destacado" : "☆ Destacar"}
        </Button>

        {url && (
          <LinkBtn href={url} target="_blank" rel="noreferrer">
            Ver proyecto
          </LinkBtn>
        )}
      </Actions>
    </Card>
  );
};

export default ProjectCard;
