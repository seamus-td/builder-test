Builder.io Rules

General
Do not modify existing components in src/app/components. Create new ones if needed.
Reuse before creating.
Follow Angular Style Guide.

Structure
Each component in its own folder under src/app/components/.
Must include: .ts, .html, .scss, .spec.ts.

Naming
Files: kebab-case (program-card.component.ts).
Classes: PascalCase (ProgramCardComponent).
Selectors: consistent prefix (e.g. <app-program-card>).

Builder.io Usage
Map only to components in src/app/components/.
Document all new mappings.
Inputs typed + defaults, outputs for events.

Styling
Scoped styles only (:host {}).
Follow existing SCSS patterns.
No inline styles.

THESE ARE RULES YOU MUST FOLLOW