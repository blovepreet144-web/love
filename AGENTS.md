<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project structure

- Portfolio content (profile, projects, services, skills) lives in `src/data/portfolio.ts`; pages read from it so copy and links are edited in one place.
- Shared chrome (nav, footer, toaster) renders in `src/routes/__root.tsx`; the home page is one scrolling page with anchor sections and each project has a case-study route at `/work/$slug`.
