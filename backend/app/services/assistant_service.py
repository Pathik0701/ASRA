def generate_response(question: str) -> str:

    text = question.lower().strip()

    # ---------------------------------------------
    # EXPENSES
    # ---------------------------------------------

    if (
        "expense" in text
        or "money" in text
        or "budget" in text
    ):
        return (
            "You can manage your household expenses by "
            "first listing your monthly income and regular "
            "expenses. Divide your spending into food, "
            "education, bills, healthcare, travel and savings. "
            "ASRA can help you track these expenses."
        )

    # ---------------------------------------------
    # BANKING
    # ---------------------------------------------

    if (
        "bank" in text
        or "banking" in text
        or "account" in text
    ):
        return (
            "For basic banking work, keep your required "
            "documents ready and use your bank's official "
            "branch or application. Never share your OTP, "
            "PIN, password or other confidential banking "
            "information with anyone."
        )

    # ---------------------------------------------
    # GOVERNMENT SCHEMES
    # ---------------------------------------------

    if (
        "scheme" in text
        or "government" in text
    ):
        return (
            "ASRA can help you understand government schemes "
            "in simple language. You can explore schemes "
            "related to women, education, housing, healthcare, "
            "employment and pensions."
        )

    # ---------------------------------------------
    # DAILY TASKS
    # ---------------------------------------------

    if (
        "daily" in text
        or "task" in text
        or "house" in text
    ):
        return (
            "ASRA can help you organize household tasks, "
            "manage expenses, understand basic banking "
            "processes and find useful support programs."
        )

    # ---------------------------------------------
    # DEFAULT
    # ---------------------------------------------

    return (
        "I can currently help with household expenses, "
        "banking, government schemes and daily household "
        "tasks. Ask me a question about any of these topics."
    )