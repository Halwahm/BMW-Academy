export const formatArticle = (article: string): string => {
  if (!article) return '';

  return article.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
};
