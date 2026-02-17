"""
Shared display utilities for Build Fellowship workshop notebooks.

Provides consistent, clean output formatting using IPython.display.
These utilities work in any Jupyter environment without additional dependencies.
"""
from IPython.display import display, HTML, Markdown


def heading(title: str, level: int = 2):
    """Display a formatted section heading."""
    display(Markdown(f"{'#' * level} {title}"))


def output_box(content: str, label: str = "", style: str = "info"):
    """
    Display content in a styled box.

    Args:
        content: The text content to display (supports multi-line)
        label: Optional label shown above the content
        style: One of "info" (blue), "success" (green), "warning" (yellow), "error" (red)
    """
    colors = {
        "info": ("#EFF6FF", "#1D4ED8", "#DBEAFE"),
        "success": ("#F0FDF4", "#15803D", "#DCFCE7"),
        "warning": ("#FFFBEB", "#A16207", "#FEF3C7"),
        "error": ("#FEF2F2", "#B91C1C", "#FEE2E2"),
    }
    bg, text_color, border_color = colors.get(style, colors["info"])
    label_html = f'<div style="font-weight: 600; color: {text_color}; margin-bottom: 4px;">{label}</div>' if label else ''
    display(HTML(f"""
    <div style="background: {bg}; border-left: 4px solid {border_color}; padding: 12px 16px; border-radius: 4px; margin: 8px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
        {label_html}
        <pre style="margin: 0; white-space: pre-wrap; font-size: 13px; line-height: 1.5; color: #374151;">{content}</pre>
    </div>
    """))


def compare_table(rows: list, headers: tuple = ("Technique", "Output")):
    """
    Display a comparison table.

    Args:
        rows: List of tuples (label, value) for each row
        headers: Column header names
    """
    header_html = ''.join(f'<th style="padding: 10px 14px; text-align: left; font-weight: 600; color: #374151;">{h}</th>' for h in headers)
    row_html = ''
    for i, row in enumerate(rows):
        bg = '#F9FAFB' if i % 2 == 0 else '#FFFFFF'
        cells = ''.join(f'<td style="padding: 10px 14px; color: #4B5563;">{cell}</td>' for cell in row)
        row_html += f'<tr style="background: {bg}; border-bottom: 1px solid #E5E7EB;">{cells}</tr>'
    display(HTML(f"""
    <table style="width: 100%; border-collapse: collapse; border: 1px solid #E5E7EB; border-radius: 6px; overflow: hidden; margin: 8px 0;">
        <thead><tr style="background: #F3F4F6; border-bottom: 2px solid #D1D5DB;">{header_html}</tr></thead>
        <tbody>{row_html}</tbody>
    </table>
    """))


def llm_response(response_text: str, label: str = "LLM Response"):
    """Display an LLM response in a distinctive styled box."""
    output_box(response_text, label=label, style="info")


def separator(text: str = ""):
    """Display a visual separator, optionally with centered text."""
    if text:
        display(HTML(f'<div style="display: flex; align-items: center; margin: 16px 0;"><hr style="flex: 1; border: none; border-top: 1px solid #D1D5DB;"/><span style="padding: 0 12px; color: #6B7280; font-size: 13px;">{text}</span><hr style="flex: 1; border: none; border-top: 1px solid #D1D5DB;"/></div>'))
    else:
        display(HTML('<hr style="border: none; border-top: 1px solid #D1D5DB; margin: 16px 0;">'))
