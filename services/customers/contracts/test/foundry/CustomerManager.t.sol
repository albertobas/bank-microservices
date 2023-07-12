// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import 'forge-std/Test.sol';
import '../../src/CustomerManager.sol';

contract CustomerManagerTest is Test {
    CustomerManager public debtorsData;
    uint256 private constant _customerId = 1;
    uint256 private constant _derogatoryPublicRecs = 1;
    bytes32 private constant _dti = '19.7';
    uint256 private constant _inquiriesLast6Mths = 2;
    bytes32 private constant _fico = '700.0';
    bytes32 private constant _logAnnualIncome = '10.8';

    event CustomerAdded(
        uint256 indexed identifier,
        uint256 derogatoryPublicRecs,
        bytes32 dti,
        uint256 inquiriesLast6Mths,
        bytes32 fico,
        bytes32 logAnnualIncome
    );

    event CustomerUpdated(
        uint256 indexed identifier,
        uint256 derogatoryPublicRecs,
        bytes32 dti,
        uint256 inquiriesLast6Mths,
        bytes32 fico,
        bytes32 logAnnualIncome
    );

    function setUp() public {
        debtorsData = new CustomerManager();
    }

    function testAddCustomer() public {
        vm.expectEmit(true, true, true, true);
        emit CustomerAdded(_customerId, _derogatoryPublicRecs, _dti, _inquiriesLast6Mths, _fico, _logAnnualIncome);
        debtorsData.addCustomer(_customerId, _derogatoryPublicRecs, _dti, _inquiriesLast6Mths, _fico, _logAnnualIncome);
        (bool isCustomer, , , , , ) = debtorsData.getCustomerById(_customerId);
        assertEq(isCustomer, true);
    }

    function test_RevertedWhen_CallerIsNotOwner_AddCustomer() public {
        vm.expectRevert('Ownable: caller is not the owner');
        vm.prank(address(0));
        debtorsData.addCustomer(_customerId, _derogatoryPublicRecs, _dti, _inquiriesLast6Mths, _fico, _logAnnualIncome);
    }

    function testUpdateCustomer() public {
        debtorsData.addCustomer(_customerId, 0, _dti, _inquiriesLast6Mths, _fico, _logAnnualIncome);
        vm.expectEmit(true, true, true, true);
        emit CustomerUpdated(_customerId, 1, _dti, _inquiriesLast6Mths, _fico, _logAnnualIncome);
        debtorsData.updateCustomer(_customerId, 1, _dti, _inquiriesLast6Mths, _fico, _logAnnualIncome);
        (, uint256 derogatoryPublicRecs, , , , ) = debtorsData.getCustomerById(_customerId);
        assertEq(derogatoryPublicRecs, 1);
    }

    function test_RevertedWhen_CustomernDoesNotExist_UpdateCustomer() public {
        vm.expectRevert('Customer does not exist.');
        debtorsData.updateCustomer(
            _customerId,
            _derogatoryPublicRecs,
            _dti,
            _inquiriesLast6Mths,
            _fico,
            _logAnnualIncome
        );
    }

    function test_RevertedWhen_CallerIsNotOwner_UpdateCustomer() public {
        vm.expectRevert('Ownable: caller is not the owner');
        vm.prank(address(0));
        debtorsData.updateCustomer(
            _customerId,
            _derogatoryPublicRecs,
            _dti,
            _inquiriesLast6Mths,
            _fico,
            _logAnnualIncome
        );
    }

    function testGetCustomerById() public {
        (bool isCustomerWithDefaultValues, , , , , ) = debtorsData.getCustomerById(_customerId);
        assertEq(isCustomerWithDefaultValues, false);
        debtorsData.addCustomer(_customerId, _derogatoryPublicRecs, _dti, _inquiriesLast6Mths, _fico, _logAnnualIncome);
        (bool isCustomerAfterAddition, , , , , ) = debtorsData.getCustomerById(_customerId);
        assertEq(isCustomerAfterAddition, true);
    }
}
