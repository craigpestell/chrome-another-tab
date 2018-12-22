import React, { FC } from "react";
import styled, { keyframes } from "styled-components/macro";
import { BookmarkList } from "./BookmarkList";
import { useOnMount } from "../hooks/useOnMount";
import { actions } from "../actions";
import { Header } from "./Header";
import { ReduxState } from "../types/ReduxState";
import { useMappedState } from "redux-react-hook";
import { useMappedActions } from "../hooks/useMappedActions";
import { getFilteredBookmarks } from "../selectors/getFilteredBookmarks";

const mapState = (state: ReduxState) => ({
  bookmarks: getFilteredBookmarks(state),
  isRetrievingBookmarks: state.bookmarks.isRetrievingBookmarks
});

const mapActions = {
  rehydrate: actions.rehydrate,
  retrieveBookmarks: actions.retrieveBookmarks
};

export const App: FC = () => {
  const { bookmarks, isRetrievingBookmarks } = useMappedState(mapState);
  const { retrieveBookmarks, rehydrate } = useMappedActions(mapActions);

  useOnMount(() => {
    rehydrate();
    retrieveBookmarks();
  });

  return (
    <Root>
      {!isRetrievingBookmarks && bookmarks.length > 0 && (
        <>
          <Header />
          <Main>
            <BookmarkList bookmarkNode={bookmarks} />
          </Main>
        </>
      )}
    </Root>
  );
};

const fadeIn = keyframes`
  from { opacity: 0;}
  to { opacity: 1; }
`;

const Root = styled.div`
  text-align: center;
  transition: all 0.6s ease-out;
  height: 100%;
  background: linear-gradient(to bottom, #c6ffdd, #fbd786, #f7797d);
  background: linear-gradient(to top, #c2e59c, #64b3f4);
  background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
`;

const Main = styled.main`
  animation: ${fadeIn} 0.5s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation-delay: 0.2s;
`;