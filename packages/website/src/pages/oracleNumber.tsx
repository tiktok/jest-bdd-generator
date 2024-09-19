import React from 'react';
import { CustomPageWrapper } from '../root';
// import { TestStory } from 'jest-bdd-generator/UI/TestStory';
// import { TestOraclePluralRule } from 'demo-project/src/plural';
import { TestOracleF16Round } from 'demo-project/src/f16round';

export default function Help() {
  return (
    <CustomPageWrapper path="/oracleNumber">
      <TestOracleF16Round />
    </CustomPageWrapper>
  );
}
