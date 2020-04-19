
import React from 'react';
import './App.css';

import { RepoSearchForm } from 'features/repoSearch/RepoSearchForm';
import { IssuesListPage } from 'features/issuesList/IssuesListPage';
import { IssueDetailsPage } from 'features/issueDetails/IssueDetailsPage';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './rootReducer';

import {
  actionSetOrgRepo,
  actionSetPage,
  actionSetDisplayType,
} from 'features/issuesDisplay/issuesDisplaySlice';

const App: React.FC = () => {
  const dispatch = useDispatch();

  const { org, repo, page, displayType, issueId } = useSelector(
    (state: RootState) => state.issuesDisplay
  );

  const setOrgAndRepo = (org: string, repo: string) => {
    dispatch(actionSetOrgRepo({ org, repo }));
  };

  const setJumpToPage = (page: number) => {
    dispatch(actionSetPage({ page }));
  };

  const showIssuesList = () => {
    dispatch(actionSetDisplayType({ displayType: 'issues' }));
  };

  const showIssueComments = (issueId: number) => {
    dispatch(
      actionSetDisplayType({ displayType: 'comments', issueId: issueId })
    );
  };

  let content;

  if (displayType === 'issues') {

    content = (
      <React.Fragment>
        <RepoSearchForm
          org={org}
          repo={repo}
          setOrgAndRepo={setOrgAndRepo}
          setJumpToPage={setJumpToPage}
        />
        <IssuesListPage
          org={org}
          repo={repo}
          page={page}
          setJumpToPage={setJumpToPage}
          showIssueComments={showIssueComments}
        />
      </React.Fragment>
    );
  } else {
    const key = `${org}/${repo}/${issueId}`;
    content = (
      <IssueDetailsPage
        key={key}
        org={org}
        repo={repo}
        // TODO corrigir essa gambiarra
        issueId={issueId || 1}
        showIssuesList={showIssuesList}
      />
    );
  }

  return <div className="App">{content}</div>;
};

export default App;
