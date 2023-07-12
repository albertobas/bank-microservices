// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import '@openzeppelin/contracts/access/Ownable.sol';

contract LoanManager is Ownable {
    /**
     * @dev Event emitted when a loan is added.
     * @param identifier loan identifier.
     * @param customerId customer id.
     * @param purpose purpose of the loan.
     * @param intRate interest rate.
     * @param installment installment.
     * @param delinquencies2Yrs delinquencies in the last 2 years.
     * @param isDefault bool that represents whether this loan is default.
     */
    event LoanAdded(
        uint256 indexed identifier,
        uint256 indexed customerId,
        bytes32 purpose,
        bytes32 intRate,
        bytes32 installment,
        uint256 delinquencies2Yrs,
        bool isDefault
    );

    /**
     * @dev Event emitted when a loan is updated.
     * @param identifier loan identifier.
     * @param purpose purpose of the loan.
     * @param intRate interest rate.
     * @param installment installment.
     * @param delinquencies2Yrs delinquencies in the last 2 years.
     * @param isDefault bool that represents whether this loan is default.
     */
    event LoanUpdated(
        uint256 indexed identifier,
        bytes32 purpose,
        bytes32 intRate,
        bytes32 installment,
        uint256 delinquencies2Yrs,
        bool isDefault
    );

    /// @dev Struct that aims to store information about a single escrow
    struct Loan {
        // boolean to confirm an struct Loan has been set
        bool isLoan;
        // The id of the customer
        uint256 customerId;
        // The purpose of the loan (takes values "credit_card", "debt_consolidation", "educational",
        // , "home_improvement", "major_purchase", "small_business", and "all_other")
        bytes32 purpose;
        // The interest rate of the loan, as a proportion (a rate of 11% would be stored as 0.11).
        // The higher the risk the higher the rate
        bytes32 intRate;
        // The monthly installments owed by the borrower if the loan is funded
        bytes32 installment;
        // Number of delinquencies in the last two years
        uint256 delinquencies2Yrs;
        // Whether the loan is default
        bool isDefault;
    }

    /// @dev Mapping from loan id to Loan struct array
    mapping(uint256 => Loan) internal _loanIdToLoan;

    constructor() {}

    /**
     * Add a loan.
     * @param identifier loan identifier.
     * @param customerId customer id.
     * @param purpose purpose of the loan.
     * @param intRate interest rate.
     * @param installment installment.
     * @param delinquencies2Yrs delinquencies in the last 2 years.
     * @param isDefault bool that represents whether this loan is default.
     */
    function addLoan(
        uint256 identifier,
        uint256 customerId,
        bytes32 purpose,
        bytes32 intRate,
        bytes32 installment,
        uint256 delinquencies2Yrs,
        bool isDefault
    ) public onlyOwner {
        _loanIdToLoan[identifier].isLoan = true;
        _loanIdToLoan[identifier].customerId = customerId;
        _loanIdToLoan[identifier].purpose = purpose;
        _loanIdToLoan[identifier].intRate = intRate;
        _loanIdToLoan[identifier].installment = installment;
        _loanIdToLoan[identifier].delinquencies2Yrs = delinquencies2Yrs;
        _loanIdToLoan[identifier].isDefault = isDefault;
        emit LoanAdded(identifier, customerId, purpose, intRate, installment, delinquencies2Yrs, isDefault);
    }

    /**
     * Update a loan.
     * @param identifier loan identifier.
     * @param purpose purpose of the loan.
     * @param intRate interest rate.
     * @param installment installment.
     * @param delinquencies2Yrs delinquencies in the last 2 years.
     * @param isDefault bool that represents whether this loan is default.
     */
    function updateLoan(
        uint256 identifier,
        bytes32 purpose,
        bytes32 intRate,
        bytes32 installment,
        uint256 delinquencies2Yrs,
        bool isDefault
    ) public onlyOwner {
        require(_loanIdToLoan[identifier].isLoan == true, 'Loan does not exist.');
        _loanIdToLoan[identifier].purpose = purpose;
        _loanIdToLoan[identifier].intRate = intRate;
        _loanIdToLoan[identifier].installment = installment;
        _loanIdToLoan[identifier].delinquencies2Yrs = delinquencies2Yrs;
        _loanIdToLoan[identifier].isDefault = isDefault;
        emit LoanUpdated(identifier, purpose, intRate, installment, delinquencies2Yrs, isDefault);
    }

    /**
     * Get loan data by identifier.
     * @param identifier loan identifier.
     * @return isLoan bool that represents whether this loan has been added.
     * @return customerId customer id.
     * @return purpose purpose of the loan.
     * @return intRate interest rate.
     * @return installment installment.
     * @return delinquencies2Yrs delinquencies in the last 2 years.
     * @return isDefault bool that represents whether this loan is default.
     */
    function getLoanById(
        uint256 identifier
    )
        external
        view
        returns (
            bool isLoan,
            uint256 customerId,
            bytes32 purpose,
            bytes32 intRate,
            bytes32 installment,
            uint256 delinquencies2Yrs,
            bool isDefault
        )
    {
        Loan memory loan = _loanIdToLoan[identifier];
        return (
            loan.isLoan,
            loan.customerId,
            loan.purpose,
            loan.intRate,
            loan.installment,
            loan.delinquencies2Yrs,
            loan.isDefault
        );
    }
}
