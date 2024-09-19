import React from 'react';
import { CustomPageWrapper } from '../root';
// import { TestStory } from 'jest-bdd-generator/UI/TestStory';
import { TestOraclePluralRule } from 'demo-project/src/plural';

export default function Help() {
  return (
    <CustomPageWrapper path="/oracleIntl">
      <TestOraclePluralRule />
    </CustomPageWrapper>
  );
}
