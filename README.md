# Motion Farmer Storybook

Documentation Storybook maintenue par **VIRY Brandon** (developpeur web).  
Ce projet sert de reference professionnelle pour des tutoriels, cas pratiques et patterns UI.

## Contenu

- **Motion Farmer** : tutoriels et cas reels autour de Framer Motion
- **Guides** : methode pedagogique appliquee a chaque tutorial

## Scripts

```bash
pnpm storybook
pnpm build-storybook
```

## Arborescence des stories

Les stories sont classees par dossiers via le champ `title` dans chaque story.  
Exemples:

- `MotionFarmer/Introduction`
- `MotionFarmer/Tutorial/AnimatePresence`
- `MotionFarmer/Tutorial/ScrollAnimation`

## Branding Storybook

Tu peux personnaliser le nom et le logo ici:

- `/.storybook/manager.ts`
- `/.storybook/preview-head.html`
- `public/brand-logo.svg`

## Deploiement Vercel

Le build Storybook genere un dossier `storybook-static` (ignore par git).  
Pour Vercel, la config est dans `vercel.json`.

Commandes:
- **Build**: `pnpm build-storybook`
- **Output**: `storybook-static`
