import React, { useContext } from "react";
import { Card, CardHeader, CardTitle } from "reactstrap";
import { IntlContext } from "../../utility/context/Internationalization";

const Home = () => {
  const { messages } = useContext(IntlContext);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle> welcome to singularity </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Home;
