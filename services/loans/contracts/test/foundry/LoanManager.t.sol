// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import 'forge-std/Test.sol';
import '../../src/LoanManager.sol';

contract LoanManagerTest is Test {
    LoanManager public debtorsData;
    uint256 private constant _customerId = 1;
    uint256 private constant _delinquencies2Yrs = 0;
    uint256 private constant _loanId = 1;
    bytes32 private constant _installment = '500.50';
    bytes32 private constant _intRate = '0.13';
    bool private constant _isDefault = false;
    bytes32 private constant _purpose = 'debt_consolidation';

    event LoanAdded(
        uint256 indexed identifier,
        uint256 indexed customerId,
        bytes32 purpose,
        bytes32 intRate,
        bytes32 installment,
        uint256 delinquencies2Yrs,
        bool isDefault
    );

    event LoanUpdated(
        uint256 indexed identifier,
        bytes32 purpose,
        bytes32 intRate,
        bytes32 installment,
        uint256 delinquencies2Yrs,
        bool isDefault
    );

    event CustomerUpdated(
        uint256 indexed identifier,
        uint256 derogatoryPublicRecs,
        bytes32 dti,
        uint256 inquiriesLast6Mths,
        uint256 fico,
        bytes32 logAnnualIncome
    );

    function setUp() public {
        debtorsData = new LoanManager();
    }

    function testAddLoan() public {
        vm.expectEmit(true, true, true, true);
        emit LoanAdded(_loanId, _customerId, _purpose, _intRate, _installment, _delinquencies2Yrs, _isDefault);
        debtorsData.addLoan(_loanId, _customerId, _purpose, _intRate, _installment, _delinquencies2Yrs, _isDefault);
        (bool isLoan, , , , , , ) = debtorsData.getLoanById(_loanId);
        assertEq(isLoan, true);
    }

    function test_RevertedWhen_CallerIsNotOwner_AddLoan() public {
        vm.expectRevert('Ownable: caller is not the owner');
        vm.prank(address(0));
        debtorsData.addLoan(_loanId, _customerId, _purpose, _intRate, _installment, _delinquencies2Yrs, _isDefault);
    }

    function testUpdateLoan() public {
        debtorsData.addLoan(_loanId, _customerId, _purpose, _intRate, _installment, _delinquencies2Yrs, false);
        vm.expectEmit(true, true, true, true);
        emit LoanUpdated(_loanId, _purpose, _intRate, _installment, _delinquencies2Yrs, true);
        debtorsData.updateLoan(_loanId, _purpose, _intRate, _installment, _delinquencies2Yrs, true);
        (, , , , , , bool isDefault) = debtorsData.getLoanById(_loanId);
        assertEq(isDefault, true);
    }

    function test_RevertedWhen_LoanDoesNotExist_UpdateLoan() public {
        vm.expectRevert('Loan does not exist.');
        debtorsData.updateLoan(_loanId, _purpose, _intRate, _installment, _delinquencies2Yrs, _isDefault);
    }

    function test_RevertedWhen_CallerIsNotOwner_UpdateLoan() public {
        vm.expectRevert('Ownable: caller is not the owner');
        vm.prank(address(0));
        debtorsData.updateLoan(_loanId, _purpose, _intRate, _installment, _delinquencies2Yrs, _isDefault);
    }

    function testGetLoanById() public {
        (bool isLoanWithDefaultValues, , , , , , ) = debtorsData.getLoanById(_loanId);
        assertEq(isLoanWithDefaultValues, false);
        debtorsData.addLoan(_loanId, _customerId, _purpose, _intRate, _installment, _delinquencies2Yrs, _isDefault);
        (bool isLoanAfterAddition, , , , , , ) = debtorsData.getLoanById(_loanId);
        assertEq(isLoanAfterAddition, true);
    }
}
