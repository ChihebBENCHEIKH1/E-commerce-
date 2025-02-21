import React, { useEffect } from "react";
import FeaturedModels from "../components/featuredModels/FeaturedModels";
import Hero from "../components/hero/Hero";
import Layout from "../../../common/layout/Layout";
import { useDispatch } from "react-redux";
import { getLoggedInUser } from "../../auth/thunks/AuthThunk";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoggedInUser());
  }, []);

  return (
    <Layout>
      <Hero />
      <FeaturedModels />
    </Layout>
  );
};

export default HomePage;
