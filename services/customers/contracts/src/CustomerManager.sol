// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import '@openzeppelin/contracts/access/Ownable.sol';

contract CustomerManager is Ownable {
    /**
     * @dev Event emitted when a customer is added.
     * @param identifier customer identifier.
     * @param derogatoryPublicRecs number of derogatory public records.
     * @param dti debt-to-income ratio.
     * @param inquiriesLast6Mths number of credit inquiries by the borrower in the last 6 months.
     * @param fico FICO range.
     * @param logAnnualIncome logarithm of the annual income.
     */
    event CustomerAdded(
        uint256 indexed identifier,
        uint256 derogatoryPublicRecs,
        bytes32 dti,
        uint256 inquiriesLast6Mths,
        bytes32 fico,
        bytes32 logAnnualIncome
    );

    /**
     * @dev Event emitted when a customer is updated.
     * @param identifier customer identifier.
     * @param derogatoryPublicRecs number of derogatory public records.
     * @param dti debt-to-income ratio.
     * @param inquiriesLast6Mths number of credit inquiries by the borrower in the last 6 months.
     * @param fico FICO range.
     * @param logAnnualIncome logarithm of the annual income.
     */
    event CustomerUpdated(
        uint256 indexed identifier,
        uint256 derogatoryPublicRecs,
        bytes32 dti,
        uint256 inquiriesLast6Mths,
        bytes32 fico,
        bytes32 logAnnualIncome
    );

    /// @dev Struct that aims to store information about a single escrow
    struct Customer {
        bool isCustomer;
        uint256 derogatoryPublicRecs;
        bytes32 dti;
        uint256 inquiriesLast6Mths;
        bytes32 fico;
        bytes32 logAnnualIncome;
    }

    /// @dev Mapping from customer id to Customer struct array
    mapping(uint256 => Customer) internal _customerIdToCustomer;

    constructor() {}

    /**
     * @dev Add a customer.
     * @param identifier customer identifier.
     * @param derogatoryPublicRecs number of derogatory public records.
     * @param dti debt-to-income ratio.
     * @param inquiriesLast6Mths number of credit inquiries by the borrower in the last 6 months.
     * @param fico FICO range.
     * @param logAnnualIncome logarithm of the annual income.
     */
    function addCustomer(
        uint256 identifier,
        uint256 derogatoryPublicRecs,
        bytes32 dti,
        uint256 inquiriesLast6Mths,
        bytes32 fico,
        bytes32 logAnnualIncome
    ) public onlyOwner {
        _customerIdToCustomer[identifier].isCustomer = true;
        _customerIdToCustomer[identifier].derogatoryPublicRecs = derogatoryPublicRecs;
        _customerIdToCustomer[identifier].dti = dti;
        _customerIdToCustomer[identifier].inquiriesLast6Mths = inquiriesLast6Mths;
        _customerIdToCustomer[identifier].fico = fico;
        _customerIdToCustomer[identifier].logAnnualIncome = logAnnualIncome;
        emit CustomerAdded(identifier, derogatoryPublicRecs, dti, inquiriesLast6Mths, fico, logAnnualIncome);
    }

    /**
     * @dev Update a customer.
     * @param identifier customer identifier.
     * @param derogatoryPublicRecs number of derogatory public records.
     * @param dti debt-to-income ratio.
     * @param inquiriesLast6Mths number of credit inquiries by the borrower in the last 6 months.
     * @param fico FICO range.
     * @param logAnnualIncome logarithm of the annual income.
     */
    function updateCustomer(
        uint256 identifier,
        uint256 derogatoryPublicRecs,
        bytes32 dti,
        uint256 inquiriesLast6Mths,
        bytes32 fico,
        bytes32 logAnnualIncome
    ) public onlyOwner {
        require(_customerIdToCustomer[identifier].isCustomer == true, 'Customer does not exist.');
        _customerIdToCustomer[identifier].derogatoryPublicRecs = derogatoryPublicRecs;
        _customerIdToCustomer[identifier].dti = dti;
        _customerIdToCustomer[identifier].inquiriesLast6Mths = inquiriesLast6Mths;
        _customerIdToCustomer[identifier].fico = fico;
        _customerIdToCustomer[identifier].logAnnualIncome = logAnnualIncome;
        emit CustomerUpdated(identifier, derogatoryPublicRecs, dti, inquiriesLast6Mths, fico, logAnnualIncome);
    }

    /**
     * Get customer data by identifier.
     * @param identifier customer identifier.
     * @return isCustomer bool that represents whether this customer has been added.
     * @return derogatoryPublicRecs number of derogatory public records.
     * @return dti debt-to-income ratio.
     * @return inquiriesLast6Mths number of credit inquiries by the borrower in the last 6 months.
     * @return fico FICO range.
     * @return logAnnualIncome logarithm of the annual income.
     */
    function getCustomerById(
        uint256 identifier
    )
        external
        view
        returns (
            bool isCustomer,
            uint256 derogatoryPublicRecs,
            bytes32 dti,
            uint256 inquiriesLast6Mths,
            bytes32 fico,
            bytes32 logAnnualIncome
        )
    {
        Customer memory customer = _customerIdToCustomer[identifier];
        return (
            customer.isCustomer,
            customer.derogatoryPublicRecs,
            customer.dti,
            customer.inquiriesLast6Mths,
            customer.fico,
            customer.logAnnualIncome
        );
    }
}
