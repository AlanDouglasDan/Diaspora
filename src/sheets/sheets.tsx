import { registerSheet, SheetDefinition } from "react-native-actions-sheet";

import { ProfileFieldSheet } from "./profileFieldSheet";
import type { ProfileFieldSheetPayload } from "./profileFieldSheet";
import { LikesUpgradeSheet } from "./likesUpgradeSheet";
import type { LikesUpgradeSheetPayload } from "./likesUpgradeSheet";
import { MatchActionSheet } from "./matchActionSheet";
import type { MatchActionSheetPayload } from "./matchActionSheet";
import { FilterSelectSheet } from "./filterSelectSheet";
import type { FilterSelectSheetPayload } from "./filterSelectSheet";
import { MatchUpgradeSheet } from "./matchUpgradeSheet";
import type { MatchUpgradeSheetPayload } from "./matchUpgradeSheet";
import { BoostSheet } from "./boostSheet";
import type { BoostSheetPayload } from "./boostSheet";

registerSheet("profile-field-sheet", ProfileFieldSheet);
registerSheet("likes-upgrade-sheet", LikesUpgradeSheet);
registerSheet("match-action-sheet", MatchActionSheet);
registerSheet("filter-select-sheet", FilterSelectSheet);
registerSheet("match-upgrade-sheet", MatchUpgradeSheet);
registerSheet("boost-sheet", BoostSheet);

declare module "react-native-actions-sheet" {
  interface Sheets {
    "profile-field-sheet": SheetDefinition<{
      payload: ProfileFieldSheetPayload;
    }>;
    "likes-upgrade-sheet": SheetDefinition<{
      payload: LikesUpgradeSheetPayload;
    }>;
    "match-action-sheet": SheetDefinition<{
      payload: MatchActionSheetPayload;
    }>;
    "filter-select-sheet": SheetDefinition<{
      payload: FilterSelectSheetPayload;
    }>;
    "match-upgrade-sheet": SheetDefinition<{
      payload: MatchUpgradeSheetPayload;
    }>;
    "boost-sheet": SheetDefinition<{
      payload: BoostSheetPayload;
    }>;
  }
}

export {};
