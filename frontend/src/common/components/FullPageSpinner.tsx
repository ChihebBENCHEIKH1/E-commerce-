import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";

import { breakpoints, sizes } from "../theme/variables";

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: calc(70vh - ${sizes.pageHeaderSmall});

  ${breakpoints.small} {
    min-height: calc(70vh - ${sizes.pageHeader});
  }

  ${breakpoints.medium} {
    min-height: 70vh;
  }
`;

export const FullPageSpinner = () => (
  <SpinnerWrapper>
    <CircularProgress size={80} />
  </SpinnerWrapper>
);
