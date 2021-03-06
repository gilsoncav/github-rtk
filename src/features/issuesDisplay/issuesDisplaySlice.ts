import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PageM {
  page: number;
}

interface OrgRepoM {
  org: string;
  repo: string;
}

interface DisplayTypeM {
  displayType: 'issues' | 'comments';
  issueId?: number | null;
}

type CurrentDisplaySliceM = PageM & OrgRepoM & DisplayTypeM;

const initialState: CurrentDisplaySliceM = {
  page: 1,
  org: 'rails',
  repo: 'rails',
  displayType: 'issues',
  issueId: null,
};

const slice = createSlice({
  name: 'issuesDisplay',
  initialState,
  reducers: {
    actionSetPage(state, action: PayloadAction<PageM>) {
      const { page } = action.payload;
      state.page = page;
    },
    actionSetOrgRepo(state, action: PayloadAction<OrgRepoM>) {
      const { org, repo } = action.payload;

      state.org = org;
      state.repo = repo;
    },
    actionSetDisplayType(state, action: PayloadAction<DisplayTypeM>) {
      const { displayType, issueId = null } = action.payload;

      state.displayType = displayType;
      state.issueId = issueId;
    },
  },
});

export const {
  actionSetPage,
  actionSetOrgRepo,
  actionSetDisplayType,
} = slice.actions;

export default slice.reducer;
