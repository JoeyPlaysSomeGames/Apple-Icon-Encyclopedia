/*******************************************************************************
  @File         DfMentorScoreViewDelegate.h

  @Description  delegate method prototypes for the scoreView and the fullPageScoreView

  @DRI          Oliver Luedecke <oluedecke@apple.com>

  @Copyright    (c) 2002-2008 Apple Inc. All rights reserved.
*******************************************************************************/

//------------------------------------------------------------------
#pragma mark -
#pragma mark Delegate informal protocol

/*! Delegate informal protocol */
@interface NSObject (DfMentorScoreView_Delegate)
- (BOOL) scoreView:(id)scoreView shouldChangeCycleRangeToLeftCycle:(LgClock_t) leftCycle rightCycle:(LgClock_t) rightCycle;
- (void) scoreView:(id)scoreView cycleRangeChangedToLeftCycle:(LgClock_t) leftCycle rightCycle:(LgClock_t) rightCycle;
- (void) scoreView:(id)scoreView mouseDownAtClock:(LgClock_t) clock;
- (void) scoreView:(id)scoreView mouseMovedToClock:(LgClock_t) clock;
- (void) scoreView:(id)scoreView mouseUpAtClock:(LgClock_t) clock;
@end
