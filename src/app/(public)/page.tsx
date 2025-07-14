import { Grid, GridCol, Title } from "@mantine/core";

import IndexWelCome from "./_components/IndexWelcome";
import ContactForm from "./_components/ContactForm";

export default function Home() {
  return (
    <main className="">
      <IndexWelCome />

      <Grid id="presentation" className="page-vertical-flow py-6">
        <GridCol span={{ base: 12, sm: 6 }}>
          <div className="service-item">
            <Title order={3}>Le côté mécano</Title>
            <p>
              Je réalise toute opération de maintenance, montage(s) et
              réparations mécaniques sur vos vélos quelque soit le type*. Les
              pièces commandées sur internet sont acceptées (sous réserve de
              vérification). <strong>Contactez-moi !</strong>
            </p>
          </div>
          <div className="service-item">
            <Title order={3}>Le côté conseil</Title>
            <p>
              Je propose un accompagnement dans votre pratique du vélo, pour
              optimiser vos trajets, préparer votre weekend, vos vacances, et
              pourquoi pas vous aider à choisir un vélo adapté.
              <br />
              Vous êtes entrepreneur (ou projetez de l&apos;être) et la démarche
              d&apos;intervention en vélo cargo vous intéresse.{" "}
              <strong>Parlons-en !</strong>
            </p>
          </div>
          <div className="service-item">
            <Title order={3}>Le coin des entreprises</Title>
            <p>
              Vous souhaitez un entretien de votre flotte, un accompagnement de
              vos employés, des idées pour renforcer la pratique du vélo dans
              votre entreprise ? <strong>Rencontrons-nous !</strong>
            </p>
          </div>
        </GridCol>
        <GridCol span={{ base: 12, sm: 6 }} className="bg-gray-400">
          <ContactForm></ContactForm>
        </GridCol>
      </Grid>
    </main>
  );
}
