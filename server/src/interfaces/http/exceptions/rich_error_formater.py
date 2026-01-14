



#! Keep this decoupled from the exception handler.

from rich.traceback import Traceback
from rich.console import Console

console = Console()



def rich_error_formater(exc: Exception):
    try:
        console.print(
            Traceback.from_exception(
                type(exc),
                exc,
                exc.__traceback__,
                show_locals=True,
            )
        )
    except Exception as formatting_error:  # pragma: no cover - best effort logging
        console.print(
            f"[yellow]Rich traceback rendering failed ({formatting_error}). Falling back to basic output.[/yellow]"
        )
        console.print(
            Traceback.from_exception(
                type(exc),
                exc,
                exc.__traceback__,
                show_locals=False,
            )
        )
